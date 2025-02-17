"use client";
import TeamListItem from "./TeamListItem";
import useSWR from "swr";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { fetcher } from "../../lib/utils";
import { Loader2, Trophy } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import useUserStore from "../../store/userStore";
import WaterMark from "../WaterMark";

type FavoriteTeamItem = {
  id: number;
  name: string;
  code: string;
};

const TeamList = ({ leagueId }: { leagueId: number }) => {
  const { selectedFavorites, saveFavorites, isSaving } = useUserStore();
  const { toast } = useToast();

  // Fetch teams data using SWR
  const {
    data: teams,
    error,
    isLoading,
  } = useSWR(`/api/teams?leagueId=${leagueId}`, fetcher);

  // Handle saving favorites to the db
  const saveFavoritesToDB = async () => {
    try {
      await saveFavorites();
      toast({
        title: "Favorites saved successfully! 🎉",
        description: "Your selected teams are now saved.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to save favorites. 😢",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Show loading spinner while fetching teams
  if (isLoading)
    return (
      <div className='flex flex-col justify-center items-center'>
        <WaterMark text='Loading Teams...' spinner />
      </div>
    );

  // Show error message if fetching teams fails
  if (error) return <p>Error loading teams: {error.message}</p>;

  // Show the World Cup message for leagueId === 1
  if (leagueId === 1) {
    return (
      <div className='flex flex-col justify-center items-center h-full'>
        <Trophy size={150} color='white' />
        <h2 className='text-white text-3xl font-bold mt-6'>
          World Cup 2026 coming soon...
        </h2>
      </div>
    );
  }
  return (
    <div className='w-full mt-4'>
      <ScrollArea className='h-[31rem] w-full'>
        {teams.map(({ id, name, code }: FavoriteTeamItem) => (
          <TeamListItem key={id} teamId={id} teamCode={code} teamName={name} />
        ))}
      </ScrollArea>
      <div className='mt-4 mr-6 flex justify-end'>
        <Button
          onClick={saveFavoritesToDB}
          className='px-4 py-2 bg-lime text-white rounded-md hover:bg-green-600'
          disabled={selectedFavorites.length === 0 || isSaving}
        >
          {isSaving && <Loader2 className='animate-spin' />}
          Save Favorites
        </Button>
      </div>
    </div>
  );
};

export default TeamList;
