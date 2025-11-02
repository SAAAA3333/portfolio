<?php
// This file is generated. Do not modify it manually.
return array(
	'original-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/original-block',
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
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'original-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
