resource "random_string" "random" {
  length  = 7
  special = false
  upper   = false
}

resource "random_password" "db_root_pwd" {
  length           = 31
  override_special = "!#$%&*-_=+:?"
}

resource "azurerm_resource_group" "resource_group" {
  name     = "${var.app_name}-${var.environment}-rg"
  location = var.location
}

resource "azurerm_key_vault" "keyvault" {
  name                        = "${random_string.random.result}-kv"
  location                    = azurerm_resource_group.resource_group.location
  resource_group_name         = azurerm_resource_group.resource_group.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id
    secret_permissions = [
      "Get", "Set", "Delete", "List"
    ]
  }
}


module "mysql_database" {
  source                       = "../terraform-modules/mysql-server"
  mysql_name                   = random_string.random.result
  resource_group_name          = azurerm_resource_group.resource_group.name
  location                     = azurerm_resource_group.resource_group.location
  administrator_login          = "${random_string.random.result}root"
  administrator_login_password = random_password.db_root_pwd.result
  sku_name                     = "B_Gen5_2"
  storage_mb                   = 5120
  mysql_version                = "5.7"
}

resource "azurerm_key_vault_secret" "mysql_user" {
  name         = "mysqlUser"
  value        = "${random_string.random.result}root"
  key_vault_id = azurerm_key_vault.keyvault.id
}

resource "azurerm_key_vault_secret" "mysql_pwd" {
  name         = "mysqlPassword"
  value        = random_password.db_root_pwd.result
  key_vault_id = azurerm_key_vault.keyvault.id
}

module "app_service_backend" {
  source              = "../terraform-modules/linux-app-service"
  service_plan_name = "backend-sp"
  app_name            = "beckend-wa"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_resource_group.resource_group.location
  sku_name            = var.sku_name
}