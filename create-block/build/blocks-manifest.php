<?php
// This file is generated. Do not modify it manually.
return array(
	'gallery-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/gallery-block',
		'version' => '0.1.0',
		'title' => 'Gallery Block',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'mediaID' => array(
				'type' => 'number',
				'default' => 0
			),
			'mediaURL' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'img',
				'attribute' => 'src'
			)
		),
		'textdomain' => 'gallery-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'introduction-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/introduction-block',
		'version' => '0.1.0',
		'title' => 'Introduction Block',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.introduction_h2'
			),
			'text1' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.introduction_h4'
			),
			'color1' => array(
				'type' => 'string',
				'default' => ''
			),
			'fontSize1' => array(
				'type' => 'string',
				'default' => ''
			),
			'tags' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'string'
				)
			),
			'text2' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.introduction_subtext'
			),
			'imageUrl1' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageUrl2' => array(
				'type' => 'string',
				'default' => ''
			),
			'frameColor' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'example' => array(
			
		),
		'textdomain' => 'introduction-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
