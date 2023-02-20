resource "random_string" "random" {
  length           = 7
  special          = false
  upper = false
}

module "skaylink-resourcegroup" {
  source  = "skaylink/skaylink-resourcegroup/azurerm"
  version = "1.2.0"
  name = "${random_string.random}-rg"
  location = var.location
  tags = {
    "some": "thing"
  }
}

module "app_service" {
  source = "../terraform-modules/linux-app-service"
  app_name = ""
  resource_group_name = module.skaylink-resourcegroup.resource_group.name
  location = var.location
  sku_name = var.sku_name
}