<?php


if (!defined('TYPO3')) {
	die ('Access denied.');
}

$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['classes']['Domain/Model/News'][] = 'bertigolfnewsgeo';

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
	'bertigolfnewsgeo',
	'Newsgeokoords',
	array(
		'News' => 'list,detail,dateMenu,searchForm,searchResult',
	),
	// non-cacheable actions
	array(
		
	)
);
