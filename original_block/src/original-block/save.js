/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

import { RichText } from '@wordpress/block-editor';

// 定義部
export default function save({ attributes }) {
	const { title, text1, tags = [], text2, imageUrl1, imageUrl2 } = attributes;

	return (
		<div className="introduction">
			<div className="introduction_text">
				<div className="introduction_title">
					{imageUrl1 && <img src={imageUrl1} className="introduction_icon" alt="" />}
					<RichText.Content
						tagName="h2"
						value={title}
						className="introduction_h2"
					/>
				</div>
					<RichText.Content
						tagName="h4"
						value={text1}
						className="introduction_h4"
					/>

				{/* タグ */}
				<div className="tags-area">
					{tags.map((tag, index) => (
						<span key={index} className="text_frame_circle">{tag}</span>
					))}
				</div>
				<RichText.Content
					tagName="p"
					value={text2}
					className="introduction_subtext"
				/>
			</div>
			{imageUrl2 && <img src={imageUrl2} className="introduction_img" alt="" />}
		</div>
	);
}