resource "random_string" "random" {
  length           = 7
  special          = false
  upper = false
}

resource "random_password" "db_root_pwd" {
  length = 31
  override_special = "!#$%&*-_=+:?"
}


module "mysql_database" {
  source = "../terraform-modules/mysql-server"
  mysql_name = random_string.random.result
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location = data.azurerm_resource_group.resource_group.location
  administrator_login = "root"
  administrator_login_password = random_password.db_root_pwd
  sku_name = "B_Gen5_2"
  storage_mb = 5120
  version = "5.7"
}


# module "app_service" {
#   source = "../terraform-modules/linux-app-service"
#   app_name = ""
#   resource_group_name = module.skaylink-resourcegroup.resource_group.name
#   location = var.location
#   sku_name = var.sku_name
# }