<?php
if (!defined('TYPO3')) {
	die ('Access denied.');
}


\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
        'bertigolfnewsgeo',
        'Newsgeokoords',
        'news Geokoordinaten'
);

