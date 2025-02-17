type LiProps = {
    className: string;
    item: {
      label: string;
      price: { value: number };
      description?: string;
    };
  };
  
  export default function Li({ className, item }: LiProps) {
    return (
      <div className="li-container">
        <li className={className}>
          <strong>
            {item.label} ${item.price?.value?.toFixed(2) ?? "N/A"}
          </strong>
          {item.description && <div>{item.description}</div>}
        </li>
      </div>
    );
  }
  