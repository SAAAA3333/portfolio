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

import {
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { mediaID, mediaURL } = attributes;
	const onImageSelected = ( media ) => {
		setAttributes( {
			mediaURL: media.url,
			mediaID: media.id,
		} );
	};
	const onMediaRemoved = () => {
			setAttributes({
				mediaID: 0,
				mediaURL: ''
			});
		};
	const blockProps = useBlockProps({
			className: 'c-image'
		});
	return (
		<div {...blockProps}>
		<MediaUploadCheck>
			<MediaUpload
			onSelect={ onImageSelected }
			allowedTypes={ ['image'] }
			value={ mediaID }
			render={ ( { open } ) => (
				<Button
				className = { mediaID ? 'image-button' : 'button button-large' }
				onClick = { open }>
				{ ! mediaID ? "メディアライブラリを開く" : <img class="c-thumbnail__img" src={ mediaURL } alt="" loading="lazy" /> }
				</Button>
			) }
			/>
			{ mediaID != 0 &&
			<MediaUploadCheck>
				<Button
				onClick = { onMediaRemoved }
				isLink
				isDestructive
				className="removeImage">画像を削除</Button>
			</MediaUploadCheck>
			}
		</MediaUploadCheck>
		</div>
	);
}