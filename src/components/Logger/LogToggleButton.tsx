import { useLogContext } from "./LogContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../ui/dropdown-menu";
import { Settings } from "lucide-react";

interface TagGroup {
  label: string;
  tags: string[];
}


const TAG_GROUPS: TagGroup[] = [
  { label: "Context", tags: ["CONTEXT", "AUTH"] },
  { label: "Hooks", tags: ["CONSTRUCTION_HOOK"] },
  { label: "Components", tags: ["CONSTRUCTION_MODAL", "CARDS", "TABLE"] },
];

const LogToggleButton: React.FC = () => {
  const { toggleTag, isTagEnabled } = useLogContext();

  return (
    <div className="fixed top-20 left-5 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-1">
            <Settings className="w-4 h-4" /> Logs
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 p-2">
          {TAG_GROUPS.map((group) => (
            <DropdownMenuSub key={group.label}>
              <DropdownMenuSubTrigger>{group.label}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-56 max-h-60 overflow-y-auto">
                <DropdownMenuLabel>{group.label} Logs</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {group.tags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={isTagEnabled(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LogToggleButton;
