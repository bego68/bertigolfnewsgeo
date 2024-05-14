<?php

$defaultCropSettings = [
    'title' => 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:option.default',
    'allowedAspectRatios' => [
        '16:9' => [
            'title' => 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:ratio.16_9',
            'value' => 16 / 9
        ],
		'3:2' => [
                        'title' => '3:2',
                        'value' => 3 / 2
                    ],
        '4:3' => [
            'title' => 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:ratio.4_3',
            'value' => 4 / 3
        ],
        '1:1' => [
            'title' => 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:ratio.1_1',
            'value' => 1.0
        ],
        'NaN' => [
            'title' => 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:ratio.free',
            'value' => 0.0
        ],
    ],
    'selectedRatio' => 'NaN',
    'cropArea' => [
        'x' => 0.0,
        'y' => 0.0,
        'width' => 1.0,
        'height' => 1.0,
    ]
];
$xlargeCropSettings = $defaultCropSettings;
$xlargeCropSettings['title'] = 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:option.xlarge';
$largeCropSettings = $defaultCropSettings;
$largeCropSettings['title'] = 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:option.large';
$mediumCropSettings = $defaultCropSettings;
$mediumCropSettings['title'] = 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:option.medium';
$smallCropSettings = $defaultCropSettings;
$smallCropSettings['title'] = 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:option.small';
$extrasmallCropSettings = $defaultCropSettings;
$extrasmallCropSettings['title'] = 'LLL:EXT:bootstrap_package/Resources/Private/Language/Backend.xlf:option.extrasmall';



$GLOBALS['TCA']['tx_news_domain_model_news']['columns']['fal_media']['config']['overrideChildTca']['columns']['crop'] = [
	'config' => [
		'cropVariants' => [
			'default' => $defaultCropSettings,
			'xlarge' => $xlargeCropSettings,
			'large' => $xlargeCropSettings,
			'medium' => $mediumCropSettings,
            'small' => $smallCropSettings,
            'extrasmall' => $extrasmallCropSettings
			]
		]
	];