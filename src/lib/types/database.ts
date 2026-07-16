export type TransactionType = "income" | "expense";

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      financas_categories: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      financas_transactions: {
        Row: {
          id: string;
          user_id: string;
          description: string;
          amount: number;
          date: string;
          type: TransactionType;
          category_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          description: string;
          amount: number;
          date: string;
          type: TransactionType;
          category_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          description?: string;
          amount?: number;
          date?: string;
          type?: TransactionType;
          category_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "financas_transactions_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "financas_categories";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

export type Category = Database["public"]["Tables"]["financas_categories"]["Row"];
export type Transaction = Database["public"]["Tables"]["financas_transactions"]["Row"];
export type TransactionWithCategory = Transaction & {
  financas_categories: Pick<Category, "id" | "name"> | null;
};
