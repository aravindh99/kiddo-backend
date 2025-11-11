const User = db.define("User", {

    id: { 

        type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4, 
         primaryKey: true 
        },

    username:    { 
        
        type: DataTypes.STRING,
        unique: true, 
        allowNull: false 
    },

    password: { 

        type: DataTypes.STRING, 
        allowNull: false
    
    }
  })

  export default User;