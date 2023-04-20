variable "enable_rds_security_group_default" {
  type = bool
}

variable "rds_engine" {
  type = string
}

variable "rds_identifier" {
  type = string
}

variable "rds_db_name" {
  type = string
}

variable "rds_allocated_storage" {
  type = number
}

variable "rds_engine_version" {
  type = string
}

variable "rds_instance_class" {
  type = string
}

variable "rds_username" {
  type = string
}

variable "rds_password" {
  type = string
}

variable "rds_parameter_group_name" {
  type = string
}

variable "rds_skip_final_snapshot" {
  type = bool
}

variable "rds_publicly_accessible" {
  type = bool
}