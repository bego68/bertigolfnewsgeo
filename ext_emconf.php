<?php

/***************************************************************
 * Extension Manager/Repository config file for ext: "bertigolfnewsgeo"
 *
 * Auto generated by Extension Builder 2014-02-16
 *
 * Manual updates:
 * Only the data in the array - anything else is removed by next write.
 * "version" and "dependencies" must not be touched!
 ***************************************************************/

$EM_CONF[$_EXTKEY] = array(
	'title' => 'Geokoordinaten NEWS',
	'description' => 'Geokkordinaten für die news extension erweitern',
	'category' => 'plugin',
	'author' => 'Berti Golf',
	'author_email' => 'info@berti-golf.de',
	'author_company' => 'berti-golf.de',
	'shy' => '',
	'priority' => '',
	'module' => '',
	'state' => 'stable',
	'internal' => '',
	'uploadfolder' => '1',
	'createDirs' => '',
	'modify_tables' => '',
	'clearCacheOnLoad' => 0,
	'lockType' => '',
	'version' => '9.5.0',
	'constraints' => array(
		'depends' => array(
			'extbase' => '6.0',
			'fluid' => '6.0',
			'typo3' => '7.0.0-9.9.99',
			'news' => '2.2--7.9.99',
		),
		'conflicts' => array(
		),
		'suggests' => array(
		),
	),
);
