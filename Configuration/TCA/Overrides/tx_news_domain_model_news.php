<?php
defined('TYPO3') or die();

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

$tempColumns = [
    'lon' => [
        'exclude' => true,
        'label' => 'LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolfnewsgeo_domain_model_news.lon',
        'config' => [
            'type' => 'input',
            'size' => 30,
            'eval' => 'double6',
            'default' => 0.0,
        ],
    ],
    'lat' => [
        'exclude' => true,
        'label' => 'LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolfnewsgeo_domain_model_news.lat',
        'config' => [
            'type' => 'input',
            'size' => 30,
            'eval' => 'double6',
            'default' => 0.0,
        ],
    ],
    'track' => [
        'exclude' => true,
        'label' => 'LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolfnewsgeo_domain_model_news.track',
        'config' => ExtensionManagementUtility::getFileFieldTCAConfig(
            'track',
            [
                'appearance' => [
                    'createNewRelationLinkTitle' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:media.addFileReference',
                ],
                'foreign_types' => [
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_UNKNOWN => ['showitem' => '--palette--;;filePalette'],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_TEXT => ['showitem' => '--palette--;;filePalette'],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => ['showitem' => '--palette--;;imageoverlayPalette, --palette--;;filePalette'],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_AUDIO => ['showitem' => '--palette--;;audioOverlayPalette, --palette--;;filePalette'],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_VIDEO => ['showitem' => '--palette--;;videoOverlayPalette, --palette--;;filePalette'],
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_APPLICATION => ['showitem' => '--palette--;;filePalette'],
                ],
                'maxitems' => 6,
            ],
            'gpx,kml'
        ),
    ],
];

ExtensionManagementUtility::addTCAcolumns('tx_news_domain_model_news', $tempColumns);

ExtensionManagementUtility::addToAllTCAtypes(
    'tx_news_domain_model_news',
    '--div--;LLL:EXT:bertigolfnewsgeo/Resources/Private/Language/locallang_db.xlf:tx_bertigolf.tab,lon,lat,track',
    '',
    'after:alternative_title'
);