use sea_orm_migration::prelude::*;

mod m20250518_01_create_app_user_table;
mod m20250518_02_create_app_user_primary_key;
mod m20250518_03_create_app_user_created_at_column;
mod m20250518_04_create_app_user_updated_at_column;
mod m20250518_05_create_app_user_username_column;
mod m20250518_06_create_app_user_username_unique;
mod m20250518_07_create_app_user_password_column;
mod m20250518_08_create_app_user_email_column;
mod m20250518_09_create_app_user_email_unique;
mod m20250518_10_create_app_user_first_name_column;
mod m20250518_11_create_app_user_birthdate_column;
mod m20250526_01_create_app_event_table;
mod m20250527_01_create_app_event_primary_key;
mod m20250528_01_create_app_event_created_at_column;
mod m20250529_01_create_app_event_updated_at_column;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250518_01_create_app_user_table::Migration),
            Box::new(m20250518_02_create_app_user_primary_key::Migration),
            Box::new(m20250518_03_create_app_user_created_at_column::Migration),
            Box::new(m20250518_04_create_app_user_updated_at_column::Migration),
            Box::new(m20250518_05_create_app_user_username_column::Migration),
            Box::new(m20250518_06_create_app_user_username_unique::Migration),
            Box::new(m20250518_07_create_app_user_password_column::Migration),
            Box::new(m20250518_08_create_app_user_email_column::Migration),
            Box::new(m20250518_09_create_app_user_email_unique::Migration),
            Box::new(m20250518_10_create_app_user_first_name_column::Migration),
            Box::new(m20250518_11_create_app_user_birthdate_column::Migration),
            Box::new(m20250526_01_create_app_event_table::Migration),
            Box::new(m20250527_01_create_app_event_primary_key::Migration),
            Box::new(m20250528_01_create_app_event_created_at_column::Migration),
            Box::new(m20250529_01_create_app_event_updated_at_column::Migration),
        ]
    }
}
