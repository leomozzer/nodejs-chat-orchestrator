data "azurerm_resource_group" "resource_group" {
  name = "${var.app_name}-${var.environment}-rg"
}

data "azurerm_client_config" "current" {}