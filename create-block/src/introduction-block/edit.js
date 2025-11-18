/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import * as blockEditor from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { plus, trash } from '@wordpress/icons';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelColorSettings, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, FontSizePicker } from '@wordpress/components';


export default function Edit({ attributes, setAttributes }) {

	// 定義部
	const { title, color1, fontSize1 } = attributes;
	const { text1, tags = [], text2, imageUrl1, imageUrl2 } = attributes;

	// 画像削除
	const onMediaRemoved = () => {
		setAttributes({ imageUrl1: '' });
	};

	// タグ追加
	const addTag = () => {
		const newTags = [...tags, ''];
		setAttributes({ tags: newTags });
	};
	// タグ削除
	const removeTag = (index) => {
		const newTags = tags.filter((_, i) => i !== index);
		setAttributes({ tags: newTags });
	};
	// タグ更新
	const updateTag = (index, value) => {
		const newTags = [...tags];
		newTags[index] = value;
		setAttributes({ tags: newTags });
	};


	return (
	<>
		{/* 設定パネル */}
		<InspectorControls>
			<PanelBody title="title設定">
				<PanelColorSettings
					colorSettings={[
						{
							value: color1,
							onChange: (value) => setAttributes({ color1: value }),
							label: 'フォントカラー'
						}
					]}
				/>
				<FontSizePicker
					value={fontSize1}
					onChange={(value) => setAttributes({ fontSize1: value })}
				/>
			</PanelBody>

		</InspectorControls>


		{/* 表示部分 */}
		<div {...useBlockProps()}>
			<div className="introduction">
				<div className="introduction_text">
					<div class="introduction_title">

						{/* アイコン画像 */}
						<div className="image-upload-area">
							{/* 画像選択／変更 */}
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => setAttributes({ imageUrl1: media.url })}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button onClick={open} variant="secondary">
											{imageUrl1 ? 'アイコン変更' : 'アイコン選択'}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{/* 選択中の画像を表示 */}
							{imageUrl1 && (
								<div className="image-preview">
									<img src={imageUrl1} className="introduction_icon" alt="" />
									{/* 削除ボタン */}
									<Button
										onClick={onMediaRemoved}
										icon={trash}
										isDestructive
										variant="secondary"
										className="removeImage"
									/>
								</div>
							)}
						</div>

						{/* タイトル */}
						<blockEditor.RichText
							tagName="h2"
							placeholder="タイトル（15字以内推奨）"
							value={title}
							style={{ color: color1, fontSize: fontSize1 }}
							className="introduction_h2"
							onChange={(value) => setAttributes({ title: value })}
						/>
					</div>

					{/* 本文 */}
					<blockEditor.RichText
						tagName="h4"
						placeholder="本文テキスト"
						value={text1}
						className="introduction_h4"
						onChange={(value) => setAttributes({ text1: value })}
					/>

					{/* タグ一覧 */}
					<div className="tags-area">
						{tags.map((tag, index) => (
							<span key={index} className="text_frame_circle tag-edit">
								<blockEditor.RichText
									tagName="span"
									value={tag}
									placeholder={`タグ${index + 1}`}
									onChange={(value) => updateTag(index, value)}
								/>
								<Button
									icon={trash}
									onClick={() => removeTag(index)}
									label="削除"
									className="remove-tag-btn"
									variant="secondary"
								/>
							</span>
						))}
						<Button
							icon={plus}
							onClick={addTag}
							label="タグを追加"
							className="add-tag-btn"
							variant="primary"
						>
							タグを追加
						</Button>
					</div>

					{/* 補足 */}
					<blockEditor.RichText
						tagName="p"
						placeholder="補足テキスト"
						value={text2}
						className="introduction_subtext"
						onChange={(value) => setAttributes({ text2: value })}
					/>
				</div>
				<div>
					{/* メイン画像 */}
					<blockEditor.MediaUpload
						onSelect={(media) => setAttributes({ imageUrl2: media.url })}
						render={({ open }) => (
							<Button onClick={open} variant="secondary">
								{imageUrl2 ? '画像を変更' : '画像を選択'}
							</Button>
						)}
					/>
					{imageUrl2 && <img src={imageUrl2} className="introduction_img" alt="" />}
				</div>
			</div>
		</div>
	</>
	);
}
