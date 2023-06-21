provider "aws" {
  region = "us-east-2"
  profile = "default"
}

# Creating an EC2 instance
resource "aws_instance" "delivery_app_server" {
  ami = "ami-0e820afa569e84cc1" # Change this to the relevant AMI
  instance_type = "t2.micro"    
           

  tags = {
    Name = "delivery_app_server"
  }
}

# Create a DynamoDB Table
resource "aws_dynamodb_table" "users" {
  name           = "Users"
  read_capacity  = 5  
  write_capacity = 5  
  hash_key       = "id"

   attribute {
    name = "id"
    type = "N"
  }
}

resource "aws_dynamodb_table" "deliveries" {
  name           = "Deliveries"
  read_capacity  = 5  
  write_capacity = 5  
  hash_key       = "id"

  attribute {
    name = "id"
    type = "N"
  }
}


