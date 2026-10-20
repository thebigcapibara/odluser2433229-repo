
# resource "aws_s3_bucket" "wide_open_bucket" {
#   bucket = "open-bucket"
# }

# resource "aws_s3_bucket_public_access_block" "wide_open_bucket" {
#   bucket = aws_s3_bucket.wide_open_bucket.id

#   # wiz-scan ignore-line
#   block_public_acls       = true
#   block_public_policy     = true
#   ignore_public_acls      = true
#   restrict_public_buckets = true
# }

# resource "aws_s3_bucket_acl" "wide_open_bucket" {
#   bucket = aws_s3_bucket.wide_open_bucket.id

#   # wiz-scan ignore-line
#   acl = "public-read"
# }


resource "aws_s3_bucket" "wide_open_bucket" {
  bucket = "open-bucket-odl-user-1540112"
}

resource "aws_s3_bucket_acl" "wide_open_bucket" {
  bucket = aws_s3_bucket.wide_open_bucket.id

  # wiz-scan ignore-line
  acl = "public-read"
}