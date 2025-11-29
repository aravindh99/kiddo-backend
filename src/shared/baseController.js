export const createBaseController = (service) => {
    return {

      getAll: async (req, res, next) => {
        try {
        
          const result = await service.findAll();
  
          res.status(200).json({
            success: true,
            message: 'Records fetched successfully',
            data: result.data,
            pagination: result.pagination,
          });
        } catch (error) {
          next(error);
        }
      },
  
      /**
       * GET /resource/:id - Get single record by ID
       */
      getById: async (req, res, next) => {
        try {
          const data = await service.findById(req.params.id);
  
          res.status(200).json({
            success: true,
            message: 'Record fetched successfully',
            data,
          });
        } catch (error) {
          next(error);
        }
      },
  
      /**
       * POST /resource - Create new record
       */
      create: async (req, res, next) => {
        try {
          const data = await service.create(req.body);
  
          res.status(201).json({
            success: true,
            message: 'Record created successfully',
            data,
          });
        } catch (error) {
          next(error);
        }
      },
  
      /**
       * PUT /resource/:id - Update record by ID
       */
      update: async (req, res, next) => {
        try {
          const data = await service.update(req.params.id, req.body);
  
          res.status(200).json({
            success: true,
            message: 'Record updated successfully',
            data,
          });
        } catch (error) {
          next(error);
        }
      },
  
      /**
       * DELETE /resource/:id - Soft delete record
       */
      softDelete: async (req, res, next) => {
        try {
          await service.softDelete(req.params.id);
  
          res.status(200).json({
            success: true,
            message: 'Record deactivated successfully',
          });
        } catch (error) {
          next(error);
        }
      },
  
      /**
       * DELETE /resource/:id/permanent - Hard delete record
       */
      delete: async (req, res, next) => {
        try {
          await service.delete(req.params.id);
  
          res.status(200).json({
            success: true,
            message: 'Record deleted permanently',
          });
        } catch (error) {
          next(error);
        }
      },
    };
  };