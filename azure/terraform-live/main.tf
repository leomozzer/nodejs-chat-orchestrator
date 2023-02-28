resource "random_string" "random" {
  length           = 7
  special          = false
  upper = false
}

resource "random_password" "db_root_pwd" {
  length = 31
  override_special = "!#$%&*-_=+:?"
}

resource "azurerm_key_vault" "example" {
  name                        = "${random_string.random.result}-kv"
  location                    = data.azurerm_resource_group.resource_group.location
  resource_group_name         = data.azurerm_resource_group.resource_group.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get",
    ]

    secret_permissions = [
      "Get",
    ]

    storage_permissions = [
      "Get",
    ]
  }
}


module "mysql_database" {
  source = "../terraform-modules/mysql-server"
  mysql_name = random_string.random.result
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location = data.azurerm_resource_group.resource_group.location
  administrator_login = "root"
  administrator_login_password = random_password.db_root_pwd.result
  sku_name = "B_Gen5_2"
  storage_mb = 5120
  mysql_version = "5.7"
}


# module "app_service" {
#   source = "../terraform-modules/linux-app-service"
#   app_name = ""
#   resource_group_name = module.skaylink-resourcegroup.resource_group.name
#   location = var.location
#   sku_name = var.sku_name
# }