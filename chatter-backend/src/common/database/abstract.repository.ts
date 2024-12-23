import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

//we rename T to T for being more professional
export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {} //model of mongoose initialized with type of document correspondant through its repository
  //model is gonna be used to interact with databases and execute command as well

  async create(document: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    //filter query parameters
    const document = await this.model.findOne(filterQuery).lean<T>(); //learn more lean
    if (!document) {
      this.logger.warn(
        'Document was not found with filter query ',
        filterQuery,
      );
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<T>();
    //.lean() method is used when you want Mongoose to return a plain JavaScript object instead of a Mongoose document.
    if (!document) {
      this.logger.warn(
        'Document was not found with filter query ',
        filterQuery,
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery).lean<T[]>();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOneAndDelete(filterQuery).lean<T>();
    if (!document) {
      this.logger.warn(
        'Document was not found with filter query ',
        filterQuery,
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }
}
