use sea_orm_migration::prelude::*;

mod m20250518_01_create_app_user_table;
mod m20250518_02_create_app_user_primary_key;
mod m20250518_03_create_app_user_created_at_column;
mod m20250518_04_create_app_user_created_at_not_null;
mod m20250518_05_create_app_user_updated_at_column;
mod m20250518_06_create_app_user_updated_at_not_null;
mod m20250518_07_create_app_user_username_column;
mod m20250518_08_create_app_user_username_not_null;
mod m20250518_09_create_app_user_username_unique;
mod m20250518_10_create_app_user_password_column;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250518_01_create_app_user_table::Migration),
            Box::new(m20250518_02_create_app_user_primary_key::Migration),
            Box::new(m20250518_03_create_app_user_created_at_column::Migration),
            Box::new(m20250518_04_create_app_user_created_at_not_null::Migration),
            Box::new(m20250518_05_create_app_user_updated_at_column::Migration),
            Box::new(m20250518_06_create_app_user_updated_at_not_null::Migration),
            Box::new(m20250518_07_create_app_user_username_column::Migration),
            Box::new(m20250518_08_create_app_user_username_not_null::Migration),
            Box::new(m20250518_09_create_app_user_username_unique::Migration),
            Box::new(m20250518_10_create_app_user_password_column::Migration),
        ]
    }
}
