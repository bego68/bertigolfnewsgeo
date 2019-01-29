<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

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

?>