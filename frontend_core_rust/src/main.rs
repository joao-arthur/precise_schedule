use chrono::{NaiveDate, Duration};

fn main() {
    // Define a date
    let date = NaiveDate::from_ymd_opt(2024, 11, 23).unwrap();
    println!("Original date: {}", date);

    // Add 3 days
    let new_date = date + Duration::days(30);
    println!("New date: {}", new_date);

    // Subtract 5 days
    let earlier_date = date - Duration::days(5);
    println!("Earlier date: {}", earlier_date);
}
