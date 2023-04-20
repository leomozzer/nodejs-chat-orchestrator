variable "elastic_beanstalk_application_name" {
  type = string
}

variable "elastic_beanstalk_environment_name" {
  type = string
}

variable "tier" {
  type = string
}

variable "wait_for_ready_timeout" {
  type = string
}

variable "solution_stack_name" {
  type = string
}

variable "settings" {
  type = map(any)
}