import { ReactComponent as IconFileDownload } from '../../../../assets/icons/file-download-icon.svg';
import { DocumentsProps } from '../types';

export function DocumentsList({
  list,
}: {
  list: DocumentsProps
}) {
  return (
    <div className="documents-list" data-cy="documents-list">
      <ul className="documents-list__list" data-cy="documents-list-list">
        {list.map(({ id, name, downloadLink }) => (
          <li
            key={id}
            className="documents-list__item"
            data-cy="documents-list-item"
          >
            <span className="documents-list__text" data-cy="documents-list-text">
              {name}
            </span>
            <a href={downloadLink} className="documents-list__download" data-cy="documents-list-download" rel="noreferrer">
              <IconFileDownload />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
