resource "aws_elastic_beanstalk_application" "elastic_beanstalk_application" {
  name = var.elastic_beanstalk_application_name
}

#https://stackoverflow.com/questions/50806263/elastic-beanstalk-instance-profile-not-automatically-created-when-using-terrafor
resource "aws_elastic_beanstalk_environment" "elastic_beanstalk_environment" {
  name                   = var.elastic_beanstalk_environment_name
  application            = aws_elastic_beanstalk_application.elastic_beanstalk_application.name
  tier                   = var.tier
  wait_for_ready_timeout = var.wait_for_ready_timeout
  solution_stack_name    = var.solution_stack_name
  # setting {
  #   namespace = "aws:autoscaling:launchconfiguration"
  #   name      = "IamInstanceProfile"
  #   value     = aws_iam_instance_profile.ec2_eb_profile.name
  # }

  dynamic "setting" {
    for_each = var.settings
    content {
      namespace = setting.value["namespace"]
      name      = setting.key
      value     = setting.value["value"]
    }
  }
} 