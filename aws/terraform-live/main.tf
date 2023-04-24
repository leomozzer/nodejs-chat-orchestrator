resource "random_string" "random" {
  length  = 7
  special = false
  upper   = false
}

resource "random_password" "db_root_pwd" {
  length           = 31
  override_special = "!#$%&*-_=+:?"
}

locals {
  mysqlUser     = random_string.random.result
  mysqlHost     = random_string.random.result
  mysqlPassword = random_password.db_root_pwd.result
}

# module "mysql_database" {
#   source                            = "../terraform-modules/db-instance"
#   enable_rds_security_group_default = true
#   rds_engine                        = "mysql"
#   rds_identifier                    = "${random_string.random.result}-mysql-server-${var.environment}"
#   rds_db_name                       = "db"
#   rds_allocated_storage             = 20
#   rds_engine_version                = "5.7"
#   rds_instance_class                = "db.t2.micro"
#   rds_username                      = local.mysqlUser
#   rds_password                      = "somepassword1234"
#   rds_parameter_group_name          = "default.mysql5.7"
#   rds_skip_final_snapshot           = true
#   rds_publicly_accessible           = true
# }

resource "aws_iam_role" "ec2_role" {
  name               = "${var.app_name}-ec2-role-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.assume_policy.json
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier",
    "arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker",
    "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier",
    "arn:aws:iam::aws:policy/EC2InstanceProfileForImageBuilderECRContainerBuilds"
  ]

  inline_policy {
    name   = "eb-application-permissions"
    policy = data.aws_iam_policy_document.permissions.json
  }
}

# Create instance profile
resource "aws_iam_instance_profile" "ec2_eb_profile" {
  name = "${var.app_name}-ec2-profile-${var.environment}"
  role = aws_iam_role.ec2_role.name
}

# module "elastic_beanstalk_backend" {
#   source = "../terraform-modules/elastic-beanstalk"
#   depends_on = [
#     aws_iam_instance_profile.ec2_eb_profile
#   ]
#   elastic_beanstalk_application_name = "${var.app_name}-${var.environment}-eb-app"
#   elastic_beanstalk_environment_name = "${var.app_name}-${var.environment}-eb-env"
#   tier                               = "WebServer"
#   wait_for_ready_timeout             = "20m"
#   solution_stack_name                = "64bit Amazon Linux 2 v5.8.0 running Node.js 18"
#   settings = {
#     "IamInstanceProfile" = {
#       namespace = "aws:autoscaling:launchconfiguration"
#       name      = "IamInstanceProfile"
#       value     = "${aws_iam_instance_profile.ec2_eb_profile.name}"
#     }
#     "InstanceType" = {
#       namespace = "aws:autoscaling:launchconfiguration"
#       name      = "InstanceType"
#       value     = "t2.micro"
#     }
#   }
# }