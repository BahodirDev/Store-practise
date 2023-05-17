create database sklad;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table if exists clients cascade;

create table clients(
    clients_id uuid DEFAULT uuid_generate_v4 () primary key,
    clients_name varchar(30) not null,
    clients_nomer numeric(30) not null,
    clients_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

drop table if exists goods cascade;

create table goods(
    goods_id uuid DEFAULT uuid_generate_v4 () primary key,
    goods_name varchar(45) not null,
    goods_code varchar(35) not null,
    goods_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

drop table if exists store cascade;
create table store(
    store_id uuid DEFAULT uuid_generate_v4 () primary key,
    store_name varchar(45) not null,
    store_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

drop table if exists deliver cascade;
create table deliver(
    deliver_id uuid DEFAULT uuid_generate_v4 () primary key,
    deliver_name varchar(30) null,
    deliver_nomer numeric(30) not null,
    deliver_place varchar(30) not null,
    deliver_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- user table
drop table if exists users cascade;
create table users(
    user_id uuid DEFAULT uuid_generate_v4 () primary key,
    user_name varchar(30) null,
    user_nomer numeric(30) not null,
    user_role numeric(20) NOT NULL DEFAULT 0, 
    user_login varchar(20) not null unique,
    user_password varchar(60) not null,
    user_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- percent jadvalini tuzish zarur
drop table if exists currency cascade;
create table currency(
    currency_id uuid DEFAULT uuid_generate_v4 () primary key,
    currency_name varchar(30) not null,
    currency_amount numeric(15,3),
    minPer numeric(5,2) not null default 8,
    maxPer numeric(5,2) not null default 10
);

drop table if exists products cascade;
create table products(
    products_id uuid DEFAULT uuid_generate_v4 () primary key,
    goods_id uuid not null references goods(goods_id),
    deliver_id uuid not null references deliver(deliver_id),
    store_id uuid not null references store(store_id),
    products_box_count numeric(15) null,
    products_count numeric(30) not null,
    products_count_cost numeric(30, 10) not null,
    percent_id uuid not null references currency(currency_id),
    products_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- qarzdorlik table
DROP TABLE IF EXISTS deliver_debts CASCADE;
CREATE TABLE deliver_debts (
    deliver_debt_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deliver_id UUID NOT NULL REFERENCES deliver(deliver_id),
    goods_id UUID NOT NULL REFERENCES goods(goods_id),
    debts_count NUMERIC(15) NOT NULL,
    debts_cost NUMERIC(30, 10) NOT NULL,
    debts_due_date DATE NOT NULL,
    debts_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS debts CASCADE;

-- qarz table
create table debts(
    debts_id uuid DEFAULT uuid_generate_v4 () primary key,
    client_id uuid not null references clients(clients_id),
    goods_id uuid not null references goods(goods_id),
    debts_count NUMERIC(15) NOT NULL,
    debts_cost NUMERIC(30, 10) NOT NULL,
    debts_due_date date not null,
    debts_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- hisobot jadvalini tuzish zarur
drop table if exists reports cascade;
create table reports(
    reports_id uuid DEFAULT uuid_generate_v4 () primary key,
    store varchar(20) not null,
    goods_name varchar(45) not null,
    goods_code varchar(35) not null,
    client varchar(20) not null,
    isEnter boolean not null default false,  
    user_info varchar(40) not null,
    reports_box_count numeric(15) null,
    reports_count numeric(30) not null,
    reports_count_cost numeric(30) not null,
    percent varchar(20) not null,
    reports_total_cost numeric(25) not null,
    reports_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- montoringni o'rganish kerak
drop table if exists monitoring cascade;

create table monitoring(
    monitoring_id uuid DEFAULT uuid_generate_v4 () primary key,
    user_id uuid not null references users(user_id),
    monitoring_status ENUM(
        'perexod',
        'sotuv',
        'vozvrat',
        'qarz',
        'qarzdorlik'
    ) NOT NULL DEFAULT 'perexod',
monitoring_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);