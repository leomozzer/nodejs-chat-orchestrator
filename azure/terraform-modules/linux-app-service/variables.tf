variable "service_plan_name" {
  description = "Service Plan name"
  type        = string
}

variable "web_app_name" {
  description = "App Service name"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "location" {
  type = string
}

variable "sku_name" {
  type = string
}

variable "https_only" {
  type    = bool
  default = true
}

variable "always_on" {
  type    = bool
  default = false
}

variable "app_settings" {
  type = map
}