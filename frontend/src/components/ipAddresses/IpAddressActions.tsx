import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

interface IpAddressActionsProps {
  ipAddress: {
    id: number;
    address: string;
  };
}

export default function IpAddressActions({ ipAddress }: IpAddressActionsProps) {
  return (
    <div className="flex flex-row justify-end gap-2">
      <Tooltip title="Shodan">
        <Button
          target="_blank"
          variant="contained"
          type="button"
          href={`https://www.shodan.io/host/${ipAddress.address}`}
        >
          <SearchIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Content details">
        <Button
          variant="contained"
          type="button"
          href={`/ipaddresses?ipAddressId=${ipAddress.id}`}
        >
          <SubdirectoryArrowRightIcon />
        </Button>
      </Tooltip>
    </div>
  );
}
