use sea_orm_migration::prelude::*;

mod m20250518_01_create_app_user_table;
mod m20250518_02_create_app_user_primary_key;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250518_01_create_app_user_table::Migration),
            Box::new(m20250518_02_create_app_user_primary_key::Migration),
        ]
    }
}
