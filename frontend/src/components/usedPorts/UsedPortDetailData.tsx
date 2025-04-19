import { UsedPortResponse } from "@/adapters/usedPorts";
import Card from "@/components/containers/Card";
import { makeNetlocFromPort } from "@/utils/ipAddresses";
import TechnologyList from "../technologies/TechnologyList";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

interface UsedPortDetailDataProps {
  data: UsedPortResponse;
}

export default function UsedPortDetailData({ data }: UsedPortDetailDataProps) {
  return (
    <Card className="flex flex-col gap-12 p-6">
      <div className="flex flex-row items-center justify-between">
        <h1>{makeNetlocFromPort({ port: data })}</h1>
        <Tooltip title="IP address details">
          <Button
            type="button"
            variant="contained"
            href={`/ipaddresses?ipAddressId=${data.ip_address.id}`}
          >
            <HomeOutlinedIcon />
          </Button>
        </Tooltip>
      </div>
      <div className="flex flex-row gap-4">
        <TechnologyList technologies={data.technologies} />
      </div>
    </Card>
  );
}
