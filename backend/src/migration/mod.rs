use sea_orm_migration::prelude::*;

mod m20250516_000001_create_user_table;
mod m20250517_000001_create_user_constraint_primary_key;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250516_000001_create_user_table::Migration),
            Box::new(m20250517_000001_create_user_constraint_primary_key::Migration),
        ]
    }
}
