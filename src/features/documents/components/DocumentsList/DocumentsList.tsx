import { ReactComponent as IconFileDownload } from '../../../../assets/icons/file-download-icon.svg';
import { getMonthAndYear } from '../../../../common/utils/getMonthAndYear';
import { DocumentsProps } from '../types';

const EMPTY_TEXT = 'The list of documents is empty';

export function DocumentsList({
  list,
}: {
  list: DocumentsProps
}) {
  const listIsEmpty = list.length === 0;

  return (
    <div
      className="documents-list"
      data-cy="documents-list"
    >
      {listIsEmpty && (
        <div
          className="documents-list__empty"
          data-cy="documents-list-empty"
        >
          <span
            className="documents-list__empty-text"
            data-cy="documents-list-empty-text"
          >
            {EMPTY_TEXT}
          </span>
        </div>
      )}
      {!listIsEmpty && (
        <ul
          className="documents-list__list"
          data-cy="documents-list-list"
        >
          {list.map(({
            id,
            name,
            date,
            downloadLink,
          }) => (
            <li
              key={id}
              className="documents-list__item"
              data-cy="documents-list-item"
            >
              <span
                className="documents-list__text"
                data-cy="documents-list-text"
              >
                {`${name} - ${getMonthAndYear(date)}`}
              </span>
              <a
                href={downloadLink}
                className="documents-list__download"
                data-cy="documents-list-download"
              >
                <IconFileDownload />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
