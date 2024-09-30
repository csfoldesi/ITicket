interface Prop {
  hasMorePages: boolean | undefined;
}

const EndlessListFooter = ({ hasMorePages }: Prop) => {
  return (
    <>
      {hasMorePages && (
        <div
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
          }}>
          Loading...
        </div>
      )}
    </>
  );
};

export default EndlessListFooter;
