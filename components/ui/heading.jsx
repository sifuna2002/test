export const Heading = ({
  title,
  description
}) => {
  const headingStyles = {
    marginBottom: '1.5rem', // Add your desired margin-bottom value
  };

  const titleStyles = {
    fontSize: '1.25rem', // Add your desired font-size value
    fontWeight: '800', // Add your desired font-weight value
  };

  const descriptionStyles = {
    fontSize: '1rem', // Add your desired font-size value
    color: '#666', // Add your desired text color
    fontWeight: '300', // Add your desired font-weight value
  };

  return ( 
    <div style={headingStyles}>
      <h2 style={titleStyles}>{title}</h2>
      <p style={descriptionStyles}>
        {description}
      </p>
    </div>
  );
};
