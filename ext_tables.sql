#
# Table structure for table 'tx_news_domain_model_news'
#
CREATE TABLE tx_news_domain_model_news (

	lon double(11,6) DEFAULT '0.000000' NOT NULL,
	lat double(11,6) DEFAULT '0.000000' NOT NULL,
	track text NOT NULL,

	tx_extbase_type varchar(255) DEFAULT '' NOT NULL,

);