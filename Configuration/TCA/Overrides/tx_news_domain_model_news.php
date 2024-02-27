<?php
if (!defined('TYPO3')) {
	die ('Access denied.');
}

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
                'config' =>     \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig( 'files' ),
        ),
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tx_news_domain_model_news',$tmp_bertigolfnewsgeo_columns,1);

$GLOBALS['TCA']['tx_news_domain_model_news']['columns'][$GLOBALS['TCA']['tx_news_domain_model_news']['ctrl']['type']]['config']['items'][] = array('LLL:EXT:bertigolfnewsgeo/Resources/Private/Language');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes("tx_news_domain_model_news","lon;;;;1-1-1");
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes("tx_news_domain_model_news","lat;;;;1-1-1");
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes("tx_news_domain_model_news","track;;;;1-1-1");

$GLOBALS['TCA']['tx_news_domain_model_news']['types']['Tx_Bertigolfnewsgeo_News']['showitem'] = $GLOBALS['TCA']['tx_news_domain_model_news']['types']['1']['showitem'];
$GLOBALS['TCA']['tx_news_domain_model_news']['types']['Tx_Bertigolfnewsgeo_News']['showitem'] .= ',--div--;LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolf';
$GLOBALS['TCA']['tx_news_domain_model_news']['types']['Tx_Bertigolfnewsgeo_News']['showitem'] .= 'lon, lat, track';