import { ReactComponent as IconFileDownload } from '../../../../../../assets/icons/file-download-icon.svg';

export function DocumentsList({
  list,
}: {
  list: string[]
}) {
  return (
    <div className="documents-list" data-cy="documents-list">
      <ul className="documents-list__list" data-cy="documents-list-list">
        {list.map((documentName) => (
          <li
            key={documentName}
            className="documents-list__item"
            data-cy="documents-list-item"
          >
            <span className="documents-list__text" data-cy="documents-list-text">
              {documentName}
            </span>
            <span className="documents-list__download" data-cy="documents-list-download">
              <IconFileDownload />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
