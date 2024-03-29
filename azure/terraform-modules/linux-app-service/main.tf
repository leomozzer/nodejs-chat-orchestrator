resource "azurerm_service_plan" "service_plan" {
  name                = var.service_plan_name
  resource_group_name = var.resource_group_name
  location            = var.location
  os_type             = "Linux"
  sku_name            = var.sku_name
}

resource "azurerm_linux_web_app" "web_app" {
  name                = var.web_app_name
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = azurerm_service_plan.service_plan.id
  https_only          = var.https_only
  site_config {
    always_on           = var.always_on
    minimum_tls_version = "1.2"
    application_stack {
      node_version = "18-lts"
    }
  }
  app_settings = var.app_settings
}