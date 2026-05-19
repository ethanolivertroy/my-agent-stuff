# Intentionally insecure Terraform for testing iac-security-scanner skill

# S3 bucket with no encryption, public access, no versioning, no logging
resource "aws_s3_bucket" "data" {
  bucket = "my-app-data"
  acl    = "public-read"

  versioning {
    enabled = false
  }
}

# Security group with unrestricted ingress
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Web server security group"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# RDS instance with no encryption, publicly accessible
resource "aws_db_instance" "main" {
  allocated_storage    = 20
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  db_name              = "appdb"
  username             = "admin"
  password             = "supersecret123"
  publicly_accessible  = true
  storage_encrypted    = false
  skip_final_snapshot  = true
}

# KMS key with rotation disabled
resource "aws_kms_key" "app" {
  description         = "App encryption key"
  enable_key_rotation = false
}

# Lambda function with no VPC, no tracing, no KMS
resource "aws_lambda_function" "processor" {
  function_name = "data-processor"
  role          = aws_iam_role.lambda.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "lambda.zip"
}

# RDS cluster with no encryption
resource "aws_rds_cluster" "analytics" {
  cluster_identifier = "analytics-db"
  engine             = "aurora-mysql"
  master_username    = "admin"
  master_password    = "password123"
  storage_encrypted  = false
}

# SageMaker notebook with no encryption
resource "aws_sagemaker_notebook_instance" "ml" {
  name          = "ml-notebook"
  instance_type = "ml.t2.medium"
  role_arn      = aws_iam_role.sagemaker.arn
}

# EBS volume with no encryption
resource "aws_ebs_volume" "data" {
  availability_zone = "us-east-1a"
  size              = 100
  encrypted         = false
}

# IAM policy with wildcard actions
resource "aws_iam_policy" "admin" {
  name = "admin-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "*"
        Resource = "*"
      }
    ]
  })
}
