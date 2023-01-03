import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ page, pageSize, dataLength, setPage }) => {
  const numberOfPages = Math.floor(dataLength / pageSize);

  return (
    <Pagination>
      {page > 0 ? (
        <>
          <Pagination.First onClick={() => setPage(0)} />
          <Pagination.Prev onClick={() => setPage(page - 1)} />
        </>
      ) : (
        <>
          <Pagination.First disabled />
          <Pagination.Prev disabled />
        </>
      )}
      {page < numberOfPages ? (
        <>
          <Pagination.Next onClick={() => setPage(page + 1)} />
          <Pagination.Last onClick={() => setPage(numberOfPages)} />
        </>
      ) : (
        <>
          <Pagination.Next disabled />
          <Pagination.Last disabled />
        </>
      )}
    </Pagination>
  );
};

export default CustomPagination;
