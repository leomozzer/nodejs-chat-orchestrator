resource "aws_security_group" "rds_security_group_default" {
  count = var.enable_rds_security_group_default == true ? 1 : 0
  name  = "rds_sg_default"
  ingress {
    from_port   = 3306
    to_port     = 3306
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

#create a RDS Database Instance
resource "aws_db_instance" "rds_instance" {
  engine                 = var.rds_engine
  identifier             = var.rds_identifier
  db_name                = var.rds_db_name
  allocated_storage      = var.rds_allocated_storage
  engine_version         = var.rds_engine_version
  instance_class         = var.rds_instance_class
  username               = var.rds_username
  password               = var.rds_password
  parameter_group_name   = var.rds_parameter_group_name
  vpc_security_group_ids = ["${aws_security_group.rds_security_group_default[0].id}"]
  skip_final_snapshot    = var.rds_skip_final_snapshot
  publicly_accessible    = var.rds_publicly_accessible
}