<?php
declare(strict_types = 1);
return [
    \Bertigolf\Bertigolfnewsgeo\Domain\Model\News::class => [
        'subclasses' => [
            0 => \Bertigolf\Bertigolfnewsgeo\Domain\Model\NewsDefault::class,
            1 => \GeorgRinger\News\Domain\Model\NewsInternal::class,
            2 => \GeorgRinger\News\Domain\Model\NewsExternal::class,
        ],
    ],
    \Bertigolf\Bertigolfnewsgeo\Domain\Model\NewsDefault::class => [
        'tableName' => 'tx_news_domain_model_news',
        'recordType' => 0,
    ],
    \Bertigolf\Bertigolfnewsgeo\Domain\Model\NewsInternal::class => [
        'tableName' => 'tx_news_domain_model_news',
        'recordType' => 1,
    ],
    \Bertigolf\Bertigolfnewsgeo\Domain\Model\NewsExternal::class => [
        'tableName' => 'tx_news_domain_model_news',
        'recordType' => 2,
    ],
];