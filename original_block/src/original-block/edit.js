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

// 定義部
export default function Edit({ attributes, setAttributes }) {
	const { title, text1, tags = [], text2, imageUrl1, imageUrl2 } = attributes;


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
		<div className="introduction">
			<div className="introduction_text">
				<div class="introduction_title">
					<blockEditor.MediaUpload
						onSelect={(media) => setAttributes({ imageUrl1: media.url })}
						render={({ open }) => (
							<Button onClick={open} variant="secondary">
								{imageUrl1 ? '画像を変更' : '画像を選択'}
							</Button>
						)}
					/>
					{imageUrl1 && <img src={imageUrl1} className="introduction_icon" alt="" />}

					<blockEditor.RichText
						tagName="h2"
						placeholder="キャッチコピー（15字以内推奨）"
						value={title}
						className="introduction_h2"
						onChange={(value) => setAttributes({ title: value })}
					/>
				</div>

				<blockEditor.RichText
					tagName="h4"
					placeholder="作品紹介テキスト"
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

				<blockEditor.RichText
					tagName="p"
					placeholder="作品紹介テキスト"
					value={text2}
					className="introduction_subtext"
					onChange={(value) => setAttributes({ text2: value })}
				/>
			</div>
			<div>
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
	);
}
