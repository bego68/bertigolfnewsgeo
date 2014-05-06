<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
	$_EXTKEY,
	'Newsgeokoords',
	'news Geokoordinaten'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Geokoordinaten NEWS');

$tmp_bertigolfnewsgeo_columns = array(

	'lon' => array(
		'exclude' => 0,
		'label' => 'LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolfnewsgeo_domain_model_news.lon',
		'config' => array(
			'type' => 'input',
			'size' => 30,
			'eval' => 'double6'
		),
	),
	'lat' => array(
		'exclude' => 0,
		'label' => 'LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolfnewsgeo_domain_model_news.lat',
		'config' => array(
			'type' => 'input',
			'size' => 30,
			'eval' => 'double6'
		),
	),
	'track' => array(
		'exclude' => 0,
		'label' => 'LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolfnewsgeo_domain_model_news.track',
		'config' => 	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig( 'files' ),
	),
);
t3lib_div::loadTCA("tx_news_domain_model_news");
t3lib_extMgm::addTCAcolumns('tx_news_domain_model_news',$tmp_bertigolfnewsgeo_columns,1);

$TCA['tx_news_domain_model_news']['columns'][$TCA['tx_news_domain_model_news']['ctrl']['type']]['config']['items'][] = array('LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_news_domain_model_news.tx_extbase_type.Tx_Bertigolfnewsgeo_News','Tx_Bertigolfnewsgeo_News');

t3lib_extMgm::addToAllTCAtypes("tx_news_domain_model_news","lon;;;;1-1-1");
t3lib_extMgm::addToAllTCAtypes("tx_news_domain_model_news","lat;;;;1-1-1");
t3lib_extMgm::addToAllTCAtypes("tx_news_domain_model_news","track;;;;1-1-1");

$TCA['tx_news_domain_model_news']['types']['Tx_Bertigolfnewsgeo_News']['showitem'] = $TCA['tx_news_domain_model_news']['types']['1']['showitem'];
$TCA['tx_news_domain_model_news']['types']['Tx_Bertigolfnewsgeo_News']['showitem'] .= ',--div--;LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolfnewsgeo_domain_model_news,';
$TCA['tx_news_domain_model_news']['types']['Tx_Bertigolfnewsgeo_News']['showitem'] .= 'lon, lat, track';
