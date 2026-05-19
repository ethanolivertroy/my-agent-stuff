# EXIF Stripper Skill

An agent skill that strips sensitive EXIF metadata from images before they're published.

## Why

Digital photos embed metadata including GPS coordinates, camera serial numbers, software used, and more. Publishing images without stripping this data is a privacy risk. This skill automates the cleanup.

## Strategy

**Strip all, restore essentials.** All metadata is removed, then only orientation (so photos don't display sideways) and ICC color profile (so colors render correctly) are restored.

## Prerequisites

- [exiftool](https://exiftool.org/) — `brew install exiftool`

## Usage

### Strip

Strip sensitive EXIF metadata from images at the given path (defaults to current directory, recursive).

```
./scripts/strip-exif.sh                     # Strip all images in current directory
./scripts/strip-exif.sh ./content/images    # Strip images in specific directory
./scripts/strip-exif.sh photo.jpg           # Strip a single file
```

### Check

Audit images for sensitive metadata without modifying them.

```
./scripts/check-exif.sh                     # Check all images in current directory
./scripts/check-exif.sh ./static/images     # Check images in specific directory
```

## Automatic Commit Hook

This directory includes optional hook assets for runtimes that support them. When installed, the hook:

1. Detects staged images (jpg, jpeg, png, tiff, webp)
2. Strips sensitive EXIF metadata from each
3. Preserves orientation and ICC color profile
4. Re-stages the cleaned files
5. Lets the commit proceed

No manual intervention needed.

## What's Stripped vs Preserved

| Stripped (Privacy) | Preserved (Display) |
|-|-|
| GPS coordinates | Orientation |
| Camera serial numbers | ICC color profile |
| Software / editing history | |
| Owner / artist names | |
| Thumbnail / preview images | |
| Maker notes | |

## Supported Formats

JPG, JPEG, PNG, TIFF, WebP

## Scripts

The scripts can be used standalone outside an agent runtime:

```bash
# Strip metadata from images
./scripts/strip-exif.sh /path/to/images

# Audit images for sensitive metadata
./scripts/check-exif.sh /path/to/images
```
