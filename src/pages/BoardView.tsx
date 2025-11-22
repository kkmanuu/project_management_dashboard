import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { BoardList } from '@/components/BoardList';
import { CreateListDialog } from '@/components/CreateListDialog';

const BoardView = () => {
  // Get the boardId from route params
  const { boardId } = useParams<{ boardId: string }>();

  // Navigation helper
  const navigate = useNavigate();

  // Global store states
  const user = useStore((state) => state.user);
  const boards = useStore((state) => state.boards);
  const moveCard = useStore((state) => state.moveCard);

  // Control the "Create List" dialog
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);

  // Find the current board using ID
  const board = boards.find((b) => b.id === boardId);

  useEffect(() => {
    // Redirect if user is not logged in
    if (!user) {
      navigate('/login');
    }

    // Redirect if board doesn't exist
    if (!board) {
      navigate('/dashboard');
    }
  }, [user, board, navigate]);

  if (!board) return null; // Prevent rendering if board is undefined

  /**
   * Handles drag and drop logic after the user releases a card.
   */
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // No destination = dropped outside any droppable area
    if (!destination) return;

    // If dropped in the same place → no action needed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move card in global state
    moveCard(draggableId, destination.droppableId, destination.index);
  };

  // Sort lists by their "order" value to ensure consistent display
  const sortedLists = [...board.lists].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* === Page Header === */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* Back button and board info */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {board.title}
                </h1>

                {/* Optional description */}
                {board.description && (
                  <p className="text-sm text-muted-foreground">
                    {board.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* === Board Content === */}
      <main className="container-fluid px-4 py-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">

            {/* Render all lists with animation */}
            {sortedLists.map((list, index) => (
              <motion.div
                key={list.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BoardList list={list} />
              </motion.div>
            ))}

            {/* Add List button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sortedLists.length * 0.1 }}
              className="flex-shrink-0"
            >
              <Button
                variant="outline"
                className="w-72 h-full min-h-[100px] border-dashed hover:bg-secondary/50"
                onClick={() => setIsCreateListOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add List
              </Button>
            </motion.div>
          </div>
        </DragDropContext>
      </main>

      {/* Create List Dialog */}
      <CreateListDialog
        boardId={boardId!}
        open={isCreateListOpen}
        onOpenChange={setIsCreateListOpen}
      />
    </div>
  );
};

export default BoardView;
